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

const iterationRoute = (str, path) => {
	var pathParts = []
	while (path.length != 0) {
		pathParts.push(path.substring(path.lastIndexOf('/'), path.length))
		path = path.slice(0, -pathParts[pathParts.length - 1].length)
	}
	return str.replace(
		'#root#',
		pathParts[pathParts.length - 1] + pathParts[pathParts.length - 2]
	)
}

const windowPath = window.location.pathname

// Apply to all links, forms and input values with #root# placeholder

$('a[href*=\\#root\\#]').each((_, link) => {
	$(link).attr('href', iterationRoute($(link).attr('href'), windowPath))
})

$('input[value*=\\#root\\#]').each((_, input) => {
	$(input).attr('value', iterationRoute($(input).attr('value'), windowPath))
})

$('form[action*=\\#root\\#]').each((_, form) => {
	$(form).attr('action', iterationRoute($(form).attr('action'), windowPath))
})
