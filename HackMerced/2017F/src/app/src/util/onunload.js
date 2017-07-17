export function onUnload(callback){
  return new Promise((resolve, reject) => {
    const myEvent = window.attachEvent || window.addEventListener;
    const chkevent = window.attachEvent ? 'onbeforeunload' : 'beforeunload'; /// make IE7, IE8 compitable

    myEvent(chkevent, (event) => { // For >=IE7, Chrome, Firefox
      resolve();
    });
  });

}
