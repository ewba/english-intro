(function() {
	var stripe = Stripe('pk_live_51Hkyi1FEUB1gObsK7NrfmynQe9dftDlyYDOZKBE3WLcXxVSJZ8cAVxd5SSOwW1MMeiauFcdiAo2CHZSI1PFQMY5x00cbhghVhH');

	function wireButton(price, mode = "payment") {
		let checkoutButton = document.getElementById('checkout-button-'+price);
		checkoutButton.addEventListener('click', function () {
			stripe.redirectToCheckout({
				lineItems: [{price: price, quantity: 1}],
				mode: mode,
				successUrl: 'https://ebm.si/en',
				cancelUrl: 'https://ebm.si/en',
			})
			.then(function (result) {
				if (result.error) {
					var displayError = document.getElementById('error-message');
					displayError.textContent = result.error.message;
				}
			});
		});
	}

	wireButton("price_1Hst7OFEUB1gObsKwQUouhkN");
	wireButton("price_1Hst7YFEUB1gObsKxfh7ms8h");
	wireButton("price_1Hst7oFEUB1gObsKAGFZPC1x");
	wireButton("price_1Hst8CFEUB1gObsKsnNznlbV", "subscription");
	wireButton("price_1Hst8JFEUB1gObsK0V5kxStW", "subscription");
	wireButton("price_1Hst8SFEUB1gObsKSxuRU7j7", "subscription");

})();
