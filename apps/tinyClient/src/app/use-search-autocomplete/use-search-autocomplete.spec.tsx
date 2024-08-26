import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useSearchAutocomplete from './use-search-autocomplete';

describe('useSearchAutocomplete', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useSearchAutocomplete());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
