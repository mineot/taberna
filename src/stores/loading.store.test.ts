import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useLoadingStore } from '@store/loading.store';

describe('useLoadingStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('continues loading until every pending task finishes', () => {
    const store = useLoadingStore();
    const firstToken = store.startLoading();
    const secondToken = store.startLoading();

    expect(store.loading).toBe(true);

    store.stopLoading(firstToken);
    expect(store.loading).toBe(true);

    store.stopLoading(secondToken);
    expect(store.loading).toBe(false);
  });

  it('ignores repeated completion of the same task', () => {
    const store = useLoadingStore();
    const token = store.startLoading();

    store.stopLoading(token);
    store.stopLoading(token);

    expect(store.loading).toBe(false);
  });
});
