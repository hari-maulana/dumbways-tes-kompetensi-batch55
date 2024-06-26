
const sort = (array) => {
    let swapped;

    do {
        swapped = false;
        for (let i = 0; i < array.length; i++) {
            if (array[i] > array[i + 1]) {
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);

    return array;
};

let myArray = [20, 12, 35, 11, 17, 9, 58, 23, 69, 21];

console.log(sort(myArray));


