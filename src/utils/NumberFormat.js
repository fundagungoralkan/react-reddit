export const numberFormat = (number) => {
    let newNumber = number;
    let counter = 0;
    while ((newNumber / 1000).toFixed(1) >= 1) {
        newNumber = (newNumber / 1000).toFixed(1);
        counter += 1;
    }
    let numberString;
    switch(counter) {
        case 0:
            numberString=`${newNumber}`;
            break;
        case 1:
            numberString=`${newNumber}K`;
            break;
        case 2:
            numberString=`${newNumber}M`;
            break;
        case 3:
            numberString=`${newNumber}MRD`;
            break;
        case 4:
            numberString=`${newNumber}B`;
            break;    
        default:
            break;
    }

    return numberString;
}