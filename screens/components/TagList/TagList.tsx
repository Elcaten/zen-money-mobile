import React, {forwardRef, ReactElement, useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {Tag} from '../../../api/models';
import {View} from '../../../components';

const ITEM_HEIGHT = 56;

const DATA_PROVIDER = new DataProvider((tag1: Tag, tag2: Tag) => {
  return tag1.id !== tag2.id;
});

export interface TagListHadle {}

export interface TagListProps {
  tags: Tag[];
  renderItem: (tag: Tag) => ReactElement | null;
}

const TagListComponent: React.ForwardRefRenderFunction<TagListHadle, TagListProps> = ({renderItem, tags}, ref) => {
  const [dataProvider, setDataProvider] = React.useState(DATA_PROVIDER);
  const layoutProvider = useMemo(
    () =>
      new LayoutProvider(
        (_index) => 'item',
        (_type, dim) => {
          dim.width = Dimensions.get('window').width;
          dim.height = ITEM_HEIGHT;
        },
      ),
    [],
  );

  React.useEffect(() => {
    setDataProvider((prevState) => prevState.cloneWithRows(tags));
  }, [tags]);

  return (
    <View style={styles.container}>
      <RecyclerListView
        layoutProvider={layoutProvider}
        dataProvider={dataProvider}
        rowRenderer={(_: any, item: Tag) => renderItem(item)}
      />
    </View>
  );
};

export const TagList = forwardRef(TagListComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
