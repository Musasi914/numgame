console.log('ES called');

let privateVal = 1;
export let publicVal = 10;

function privateFn() {

}
export function publicFn() {
    console.log('publicFn called: ' + publicVal);
}