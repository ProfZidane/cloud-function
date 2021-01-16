const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

// first way to delete
exports.statusEventDeleteListener = functions.database.ref('/Status/{documentId}/{documentIdtwo}') 
    .onCreate( (snapshot, context) => {
        const data = snapshot.val();
        console.log(data); // test to see data 

        const documentId = context.params.documentId;
        const documentIdtwo = context.params.documentIdtwo;

        const time = data.timeStatus;

        const today = new Date().getTime();

        const tomorrow = new Date(time);
        
        tomorrow.setDate(tomorrow.getDate() + 1 );

        tomorrow.getTime();

        if (today === tomorrow) {
            console.log('this status had 24 hours lives');
            const deleteStatus = admin.database().ref(`/Status/${documentId}/${documentIdtwo}`).remove();

            deleteStatus.then(result => {
                console.log('status delete now !');

                return result; // i don't know datas to return !
            });
        }
    });

    // second way to delete
    exports.statusEventDeleteListener2 = functions.database.ref('/Status/{documentId}/{documentIdtwo}') 
        .onCreate( (snapshot,context) => {
            const documentId = context.params.documentId;
            const documentIdtwo = context.params.documentIdtwo;
            const time = data.timeStatus;

            const today = new Date().getTime();
            const tomorrow = new Date(time);
            tomorrow.setDate(tomorrow.getDate() + 1 );
            tomorrow.getTime();
            const delai = tomorrow - today;

            setTimeout( ()=> {
                const deleteStatus = admin.database().ref(`/Status/${documentId}/${documentIdtwo}`).remove();
                deleteStatus.then(result=>{
                    console.log('status deleted now');
                    return result; // Also don't know !
                });
            },delai);
        });

    /**
     * Use fonction to repeat action as pubsub schedule link : https://firebase.google.com/docs/functions/schedule-functions
     */
        
