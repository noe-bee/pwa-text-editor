import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (data)  => {
  console.log('PUT to the database');
  // console.log(data)

  // creates a connection to the database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // creates a new 'transaction' and specifies the database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');

  // opens up the object store.
  const store = tx.objectStore('jate');

  // use .put() method on the store and pass in the content.
  const request = store.put({ id: 1, value: data});

  // get confirmation of the request.
  const result = await request;
  console.log('Data saved to the database', result);
};


export const getDb = async () => {
  console.log('GET from the database');

  // creates a connection to the database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // creates a new transaction and specifies the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // opens up the object store.
  const store = tx.objectStore('jate');

  // use .getAll() method to get all data in the database.
  const request = store.getAll();

  // get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result.value;
};

initdb();
