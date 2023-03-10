import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase";


const FavorisManager = {

    updateFavoris: async (listName:string|string[], id:number, isAdd:boolean, uid:string) => {
        console.log(isAdd?'add ':'remove ',id,' from ',listName);
        const docRef  = doc(db, 'Favoris', uid)
        const docSnap = await getDoc(docRef);
        id = Number(id);

        if (docSnap.exists()) {
            
            const docData = docSnap.data();
            if (typeof listName === 'string') listName = [listName];

            listName.forEach(theListName => {
                const listData = docData[theListName];
                if (!isAdd && !listData) {console.log('Tried to delete from an inexisting list'); return false};
                if (isAdd) {
                    listData.push(id);
                } else {
                    const index = listData.indexOf(id);
                    if (index >= 0) {
                        listData.splice(index, 1); // 2nd parameter means remove one item only
                    } else { 
                        console.log("l'element à supprimer n'a pas été trouvé");
                        return false;
                    }
                }
                docData[theListName] = listData;
            })
            await updateDoc(docRef, docData)
            return true
        } else {
            console.log("No such document!");
            return false;
        }
    },

    updateMultipleFavorisList: async (addList:string[], removeList:string[], recId:number, uid:string) => {
        if (removeList.length > 0) await FavorisManager.updateFavoris(removeList,recId,false,uid);
        if (addList.length > 0) await FavorisManager.updateFavoris(addList,recId,true,uid);
    }
}

export default FavorisManager;