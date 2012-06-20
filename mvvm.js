var SimpleListModel = function () {
    this.items = ko.observableArray([]);
    this.itemToAdd = ko.observable("");
    this.synced = ko.observable(true);
    this.addItem = function () {
        this.items.push(this.itemToAdd());
        this.itemToAdd("");
        this.synced(false);
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
        viewModel.synced(true);
    };

    setInterval(storeViewModel, 5000);
});