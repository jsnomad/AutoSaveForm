; (function ($) {

	$.AutoSaveForm = function (el, selectorClick) {

		var base = this;
		var currentUrl = document.URL;
		var arrayData = {};
		var isManualMode;

		base.$el = $(el);
		base.el = el;

		Storage.prototype.setObject = function (value) {
			this.setItem(currentUrl, JSON.stringify(value));
		};

		Storage.prototype.getObject = function (key) {
			var value = this.getItem(key);
			return value && JSON.parse(value);
		};

		base.init = function () {
			base._getData();
			isManualMode = base._isManualMode();
			$(base.el+ " input").each(function (index) {
				var type = $(this).attr("type");
				base._initEventInputChange(this, index, type);
				base._initInputValue(index, type);
			});

			if(isManualMode){
				base._initEventClick();
			}
		};

		base._initEventInputChange = function (input, index, type) {
			switch (base._getTypeCategory(type)) {
				case "text":
				$(input).change(function () {
					base._update(index, $(input).val());
				});
				break;
				case "checkOrRadio":
				$(input).change(function () {
					base._update(index, $(input).is(":checked"));
				});
				break;
			}
		};

		base._initEventClick = function () {
			$(selectorClick).click(function () {
				localStorage.setObject(arrayData);
				return false;
			});
		};

		base._update = function (index, data) {
			arrayData[index] = data;
			if(!isManualMode){
				localStorage.setObject(arrayData);
			}
		};

		base._getTypeCategory = function (type) {
			var typeCategory = (type === "checkbox" || type === "radio") ? "checkOrRadio" : "text";
			return typeCategory;
		};

		base._isManualMode= function () {
			if(typeof(selectorClick) === "undefined"){
				return false;
			}
			else{
				return true;
			}
		};

		base._updateUI = function (index, data, type) {
			switch (base._getTypeCategory(type)) {
				case "text":
				$(base.el+ " input").eq(index).val(data);
				break;
				case "checkOrRadio":
				$(base.el+ " input").eq(index).attr("checked", data);
				break;
			}
		};

		base._initInputValue = function (index, type) {
			for (var k in arrayData) {
				if (k == index) {
					base._updateUI(index, arrayData[index], type);
				}
			}
		};

		base._getData = function () {
			$.extend(arrayData, localStorage.getObject(currentUrl));
		};

		base.init();
	};


})(jQuery);