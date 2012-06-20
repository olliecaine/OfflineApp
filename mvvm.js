var SimpleListModel = function () {
    this.items = ko.observableArray([]);
    this.itemToAdd = ko.observable("");
    this.addItem = function () {
        this.items.push(this.itemToAdd());
        this.itemToAdd("");
    } .bind(this);
};

$(function () {
    var storageKey = "model";
    var viewModel = new SimpleListModel();

    if (localStorage.getItem(storageKey)) {
        var localViewModel = ko.mapping.fromJSON(localStorage.getItem(storageKey));
        viewModel.items(localViewModel.items());
    }

    ko.applyBindings(viewModel);

    var storeViewModel = function () {
        localStorage.setItem(storageKey, ko.toJSON(viewModel));
    };

    setInterval(storeViewModel, 2000);
});