/* eslint-disable @typescript-eslint/consistent-type-imports */
import { useInternal } from '@/composables/lenz';
import { defineStore } from 'pinia';
import { computed, customRef } from 'vue';

const lenz = useInternal();


export const useViewStore = defineStore('views', () => {
  const viewMap = customRef((track, trigger) => {
    let value = lenz.views.viewMap;

    lenz.views.on('update', () => {
      value = lenz.views.viewMap;
      trigger();
    });

    return {
      get() {
        track();
        return value;
      },
      set() {
        console.warn('viewMap is readonly');
      },
    };
  });
  const panelMap = customRef((track, trigger) => {
    let value = lenz.views.panelMap;

    lenz.views.on('updatePanel', () => {
      value = lenz.views.panelMap;
      trigger();
    });

    return {
      get() {
        track();
        return value;
      },
      set() {
        console.warn('panelMap is readonly');
      },
    };
  })

  const views = computed(() => Array.from(viewMap.value.values()));

  function setViewRef(id: string, element: HTMLElement | null) {
    const item = lenz.views.getView(id);

    if (element) {
      item.controller.create?.(element);
    }
    else {
      item.controller.dispose?.();
    }
  }

  return {
    setViewRef,
    views,
    panelMap,
    toggleView: (viewId: string) => lenz.views.toggle(viewId),
  };
});