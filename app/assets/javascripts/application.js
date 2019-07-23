/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
	window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function() {
	window.GOVUKFrontend.initAll()

	$('input').attr('autocomplete', 'off')

	$('.govuk-summary-list__key').each(function() {
		if (
			$(this)
				.text()
				.trim() == ''
		) {
			$(this)
				.closest('.govuk-summary-list__row')
				.remove()
		}
	})

	window.addEventListener('pageshow', function(event) {
		var historyTraversal =
			event.persisted ||
			(typeof window.performance != 'undefined' &&
				window.performance.navigation.type === 2)
		if (historyTraversal) {
			// Handle page restore.
			window.location.reload()
		}
	})
})

function doSum() {
	var total = 0
	$('input[type=number]').each(function() {
		total += Number($(this).val())
	})
	$('.sum-total').text(total)
}

doSum()

$('input[type=number]').on('input', function() {
	doSum()
})
