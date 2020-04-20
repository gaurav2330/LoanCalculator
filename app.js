// Listen for submit
document.querySelector('#loan-form').addEventListener('submit',function(e){
    // hide resultls
    document.querySelector('#results').style.display = 'none';

    //show loader
    document.querySelector('#loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// Calculate function
function calculateResults(){

    // UI vars
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayments = parseFloat(years.value)*12;

    // compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

        //show results
        document.querySelector('#results').style.display = 'block';

        // hide loader
        document.querySelector('#loading').style.display = 'none';
    }
    else{
        showError('Please check your Input');
    }
}

// show error
function showError(error){
    // create div
    const errorDiv = document.createElement('div');

    //hide results
    document.querySelector('#results').style.display = 'none';

    // hide loader
    document.querySelector('#loading').style.display = 'none';

    // store divs from html
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // add class
    errorDiv.className = 'alert alert-danger';
    // create text node and append to div
    const text = document.createTextNode(error);
    errorDiv.appendChild(text);

    // insert error above heading
    card.insertBefore(errorDiv, heading);
    
    // clear error after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000)
};
