import {Tag} from '../../api/models';

export type EditableTag = Pick<
  Tag,
  'title' | 'parent' | 'icon' | 'color' | 'showIncome' | 'showOutcome' | 'required' | 'id'
>;
