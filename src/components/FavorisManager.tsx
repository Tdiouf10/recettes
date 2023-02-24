import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase";


const FavorisManager = {
    test:'tes',
    updateFavoris: async (listName:string, id:number, isAdd:boolean, uid:string) => {
        const docRef  = doc(db, 'Favoris', uid)
        const docSnap = await getDoc(docRef);
        id = Number(id);
        if (docSnap.exists()) {
            
            const docData = docSnap.data();
            const listData = docData[listName];
            if (!isAdd && !listData) return;

            if (isAdd) {
                listData.push(id);
            } else {
                const index = listData.indexOf(id);
                if (index >= 0) {
                    
                    listData.splice(index, 1); // 2nd parameter means remove one item only
                }
            }
            docData[listName] = listData;
            await updateDoc(docRef, docData)
            
            

          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        try {
            
            //await updateDoc(docRef, )
        } catch (error) {
            console.error('Error updating document -> ', error)
        }
    }
}

export default FavorisManager;