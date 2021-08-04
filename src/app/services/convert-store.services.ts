export const convertStoreToFormData = (storeObject: any): FormData => {
  let store = new FormData();
  for (const key in storeObject) {
    // if there is no value don't append to form
    if (!storeObject[key]) continue;
    store.append(key, storeObject[key]);
  }
  return store;
};
