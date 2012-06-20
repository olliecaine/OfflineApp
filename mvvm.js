var SimpleListModel = function () {
    this.items = ko.observableArray([]);
    this.itemToAdd = ko.observable("");
    this.saved = ko.observable(true);
    this.runningtime = ko.observable("x");
    this.addItem = function () {
        this.items.unshift(this.itemToAdd());
        this.itemToAdd("");
        this.saved(false);
    }.bind(this);
};

$(function () {
    var runningTime = 0;
    var storageKey = "model";
    var viewModel = new SimpleListModel();

    if (localStorage.getItem(storageKey) != null) {
        var localViewModel = ko.mapping.fromJSON(localStorage.getItem(storageKey));
        viewModel.items(localViewModel.items());
    }

    ko.applyBindings(viewModel);

    setInterval(function () {
        localStorage.setItem(storageKey, ko.toJSON(viewModel));
        viewModel.saved(true);
    }, 5000);

    setInterval(function () {
        runningTime += 1;
        viewModel.runningtime(runningTime);
    }, 1000);
});