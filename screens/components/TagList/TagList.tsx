import React, {forwardRef, ReactElement, ReactNode, useMemo} from 'react';
import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {Tag} from '../../../api/models';
import {View} from '../../../components';
import {ScrollViewWithHeader} from '../../../components/ScrollViewWithHeader';

const ITEM_HEIGHT = 56;

const DATA_PROVIDER = new DataProvider((tag1: Tag, tag2: Tag) => {
  return tag1.id !== tag2.id;
});

export interface TagListHadle {}

export interface TagListProps {
  tags: Tag[];
  renderItem: (tag: Tag) => ReactElement | null;
  HeaderComponent?: ReactNode;
}

const TagListComponent: React.ForwardRefRenderFunction<TagListHadle, TagListProps> = (
  {renderItem, HeaderComponent, tags},
  _,
) => {
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
      {dataProvider.getSize() > 0 && (
        <RecyclerListView
          layoutProvider={layoutProvider}
          dataProvider={dataProvider}
          rowRenderer={(_: any, item: Tag) => renderItem(item)}
          forceNonDeterministicRendering={true}
          externalScrollView={ScrollViewWithHeader as any}
          scrollViewProps={{HeaderComponent: HeaderComponent}}
        />
      )}
    </View>
  );
};

export const TagList = forwardRef(TagListComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
