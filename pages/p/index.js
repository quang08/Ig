import React, { useEffect } from "react";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db, storage } from "../../firebase";

function index() {
  const data = async () => {
    const q = query(collection(db, "posts", 'IqpButKelomlYTs53Dye', 'comments'));
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map((doc) => {
      console.log(doc.id, doc.data());
    });
  };

  useEffect(() => {
    data();
  }, []);

  return <div>index</div>;
}

export default index;
