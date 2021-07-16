import {useEffect, useMemo, useState} from 'react';
import {TransactionModel, useAccounts, useTags} from '../api-hooks';

export enum SuggestionType {
  Income = 'Income',
  Expense = 'Expense',
  Transfer = 'Transfer',
  Comment = 'Comment',
  Tag = 'Tag',
  Account = 'Account',
}

export interface SearchSuggestion {
  type: SuggestionType;
  match: string;
  id?: string;
}

export function useSearchSuggestions(_searchString: string): SearchSuggestion[] {
  const {data: tags} = useTags();
  const {data: accounts} = useAccounts();

  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);

  useEffect(() => {
    const searchString = _searchString.toLocaleLowerCase();
    const isValidNumber = !isNaN(Number.parseInt(searchString, 10));

    if (searchString == null || searchString === '') {
      setSuggestions([]);
      return;
    }

    if (isValidNumber) {
      setSuggestions([
        {type: SuggestionType.Income, match: searchString},
        {type: SuggestionType.Expense, match: searchString},
        {type: SuggestionType.Transfer, match: searchString},
        {type: SuggestionType.Comment, match: searchString},
      ]);
      return;
    }

    const tagsFound = tags.valuesArray().filter((t) => t.title.toLocaleLowerCase().startsWith(searchString));
    const accountsFound = (accounts ?? []).filter((a) => a.title.toLocaleLowerCase().startsWith(searchString));
    setSuggestions([
      {type: SuggestionType.Comment, match: _searchString},
      ...tagsFound
        .map<SearchSuggestion>((t) => {
          const parent = tags.get(t.parent!);
          const match = parent ? `${parent?.title} - ${t.title}` : t.title;
          return {type: SuggestionType.Tag, match: match, id: t.id};
        })
        .sort((a, b) => a.match.localeCompare(b.match)),
      ...accountsFound
        .map<SearchSuggestion>((a) => ({type: SuggestionType.Account, match: a.title, id: a.id}))
        .sort((a, b) => a.match.localeCompare(b.match)),
    ]);
  }, [accounts, _searchString, tags]);

  return suggestions;
}

export const useSearchResults = (transactions: TransactionModel[], searchSuggestion: SearchSuggestion | null) => {
  return useMemo(() => {
    switch (searchSuggestion?.type) {
      case SuggestionType.Comment:
        return transactions.filter((d) =>
          d.comment?.toLocaleLowerCase().startsWith(searchSuggestion.match.toLocaleLowerCase()),
        );
      case SuggestionType.Income:
        return transactions.filter((d) => d.income === Number.parseInt(searchSuggestion.match, 10));
      case SuggestionType.Expense:
        return transactions.filter((d) => d.outcome === Number.parseInt(searchSuggestion.match, 10));
      case SuggestionType.Transfer:
        return transactions.filter(
          (d) =>
            d.income === Number.parseInt(searchSuggestion.match, 10) ||
            d.outcome === Number.parseInt(searchSuggestion.match, 10),
        );
      case SuggestionType.Account:
        return transactions.filter(
          (d) => d.incomeAccount?.id === searchSuggestion.id || d.outcomeAccount?.id === searchSuggestion.id,
        );
      case SuggestionType.Tag:
        return transactions.filter((d) => d.tag?.id === searchSuggestion.id || d.parentTag?.id === searchSuggestion.id);
      default:
        return [];
    }
  }, [transactions, searchSuggestion]);
};
