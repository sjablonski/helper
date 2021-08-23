import * as firebase from 'firebase';

const uploadImageAsync = async (item, index, reportKey, getProgress) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = e => {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', item.uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref('reports')
    .child(`/images/${reportKey}/${blob._data.name}`);
  const uploadTask = ref.put(blob);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      snap => getProgress(index, snap),
      err => reject(err),
      async () => resolve({ uri: await ref.getDownloadURL() }),
    );
  });
};

export default uploadImageAsync;
