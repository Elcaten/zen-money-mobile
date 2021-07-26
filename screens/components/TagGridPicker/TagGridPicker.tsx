import React, {useMemo, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Tag} from '../../../api/models';
import {View} from '../../../components';
import {Card} from '../../../components/Card';
import {ListItem} from '../../../components/ListItem';
import {ZenText} from '../../../components/ZenText';
import {useNavigatorThemeColors} from '../../../themes';
import {argbToHEX, splitArray} from '../../../utils';
import {TagIcon} from '../TagIcon';

const {width} = Dimensions.get('window');
const ICONS_PER_ROW = 5;
const ICONS_PER_PAGE = 3 * ICONS_PER_ROW;
const ICON_WIDTH = Math.floor(width / ICONS_PER_ROW);
const ICON_SIZE = Math.floor(ICON_WIDTH / 2);
const ICON_PADDING = Math.floor(ICON_WIDTH / 8);
const ICON_MARGIN = Math.floor(ICON_WIDTH / 8);

export interface TagGridPickerProps {
  tags: Tag[];
  value: string | null;
  onValueChange?: (tag: Tag | null) => void;
}

export const TagGridPicker: React.FC<TagGridPickerProps> = ({tags, value, onValueChange}) => {
  const tagPages = useMemo<Tag[][][]>(() => {
    const rootTags = tags.filter((t) => t.parent == null).sort((t1, t2) => t1.title.localeCompare(t2.title));
    return splitArray(rootTags, ICONS_PER_PAGE).map((arr) => splitArray(arr, ICONS_PER_ROW));
  }, [tags]);

  const [selectedTag, setSelectedTag] = useState<Tag | null>(tags.find((t) => t.id === value) ?? null);
  const tagsByParent = useMemo(() => tags.groupBy('parent'), [tags]);
  const selectedTagChildren = useMemo(() => tagsByParent.get(selectedTag?.id) ?? [], [selectedTag?.id, tagsByParent]);

  return (
    <ScrollView horizontal={true} snapToInterval={width} persistentScrollbar={true}>
      {tagPages.map((tagPage, pageIdx) => (
        <Card style={styles.wrapper} key={pageIdx}>
          <TagPage
            rows={tagPage}
            selectedTag={selectedTag}
            childTags={selectedTagChildren}
            onTagPress={(tag) => {
              const newTag = tag.id === selectedTag?.id ? null : tag;
              setSelectedTag(newTag);
              onValueChange?.(newTag ?? null);
            }}
          />
        </Card>
      ))}
    </ScrollView>
  );
};

const TagPage: React.FC<{
  rows: Tag[][];
  childTags: Tag[];
  selectedTag: Tag | null;
  onTagPress: (tag: Tag) => void;
}> = ({rows, childTags, selectedTag, onTagPress}) => {
  return (
    <React.Fragment>
      {rows.map((tags, rowIdx) => (
        <TagRow
          key={rowIdx}
          tags={tags}
          childTags={childTags}
          selectedTag={selectedTag}
          onTagPress={(tag) => onTagPress(tag)}
        />
      ))}
    </React.Fragment>
  );
};

const TagRow: React.FC<{tags: Tag[]; selectedTag: Tag | null; onTagPress: (tag: Tag) => void; childTags: Tag[]}> = ({
  tags,
  selectedTag,
  onTagPress,
  childTags,
}) => {
  const isRowSelected = tags.some((t) => t.id === selectedTag?.id);
  const {card, iconColor: defaultIconColor} = useNavigatorThemeColors();

  return (
    <React.Fragment>
      <View style={styles.view}>
        {tags.map((tag) => {
          // if a child tag is selected, display its icon instead of parent icon
          if (selectedTag?.parent === tag.id) {
            tag = selectedTag;
          }
          const isSelected = tag.id === selectedTag?.id;
          const backgroundColor = isSelected ? (tag.color ? argbToHEX(tag.color) : defaultIconColor) : card;
          const color = isSelected ? card : undefined;
          return (
            <TagButton
              tag={tag}
              key={tag.id}
              color={color}
              backgroundColor={backgroundColor}
              onPress={() => onTagPress(tag)}
            />
          );
        })}
      </View>
      {isRowSelected && (
        <View>
          {childTags.map((tag) => (
            <TagListItem tag={tag} key={tag.id} onPress={() => onTagPress(tag)} />
          ))}
        </View>
      )}
    </React.Fragment>
  );
};

const TagButton: React.FC<{tag: Tag; onPress: () => void; color?: string; backgroundColor: string}> = ({
  tag,
  onPress,
  color,
  backgroundColor,
}) => {
  const {border} = useNavigatorThemeColors();

  return (
    <View style={styles.tagButton}>
      <TouchableOpacity style={[styles.iconContainer, {backgroundColor, borderColor: border}]} onPress={onPress}>
        <TagIcon icon={tag.icon} size={ICON_SIZE} key={tag.id} color={color} />
      </TouchableOpacity>
      <ZenText style={styles.tagButtonText}>{tag.title}</ZenText>
    </View>
  );
};

const TagListItem: React.FC<{tag: Tag; onPress: () => void}> = ({tag, onPress}) => {
  return (
    <ListItem bottomDivider onPress={onPress}>
      <TagIcon icon={tag.icon} size={24} />
      <ListItem.Title>{tag.title}</ListItem.Title>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 16,
  },
  iconContainer: {
    padding: ICON_PADDING,
    margin: ICON_MARGIN,
    borderWidth: 1,
    borderRadius: 100,
  },
  view: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tagButton: {
    alignItems: 'center',
    maxWidth: ICON_WIDTH,
  },
  tagButtonText: {
    fontSize: 12,
    textAlign: 'center',
  },
});
