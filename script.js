(function () {
    let data;
    data = JSON.parse(FooBar.getData());

    createElements(data);

    update(data);
})();

function createElements(data) {
    cleanup(data);

    Object.keys(data.bartenders).map(x => {

        let div = document.createElement("div");
        div.id = ('waiter' + data.bartenders[x].name)
        document.getElementById('outerDiv').appendChild(div);

        let elem = document.createElement("img");
        elem.src = 'images/bartender_150.png';
        elem.width = 100;
        elem.height = 150;
        elem.id = 'image';
        document.getElementById('waiter' + data.bartenders[x].name).appendChild(elem);

        let name = document.createElement("h1");
        let node = document.createTextNode(data.bartenders[x].name);
        name.appendChild(node);
        let element = document.getElementById("waiter" + data.bartenders[x].name);
        element.appendChild(name);

        let status = document.createElement("p");
        let nameNode = document.createTextNode(data.bartenders[x].statusDetail);
        status.appendChild(nameNode);
        let el = document.getElementById('waiter' + data.bartenders[x].name)
        element.appendChild(status);
        Object.keys(data.serving).map(y => {
            if (data.serving[y].id == data.bartenders[x].servingCustomer) {
                let div = document.createElement("div");
                div.id = ('order' + data.bartenders[x].name)
                document.getElementById('orderDiv').appendChild(div);

                Object.keys(data.serving[y].order).map(z => {
                    let para = document.createElement("p");
                    para.id = 'order';
                    let node = document.createTextNode(data.serving[y].order[z]);
                    para.appendChild(node);

                    document.getElementById('order' + data.bartenders[x].name).appendChild(para);
                })

            }
        })
    })

}
function cleanup(data) {
    Element.prototype.remove = function () {
        this.parentElement.removeChild(this);
    }
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
        for (var i = this.length - 1; i >= 0; i--) {
            if (this[i] && this[i].parentElement) {
                this[i].parentElement.removeChild(this[i]);
            }
        }
    }
    Object.keys(data.bartenders).map(x => {
        let myNode = document.getElementById("waiter" + data.bartenders[x].name);
        if (myNode) {
            myNode.remove();
        }

    })
    Object.keys(data.bartenders).map(z => {
        let myNode = document.getElementById("order" + data.bartenders[z].name);
        if (myNode) {
            myNode.remove();
        }

    })
}
function update(data) {
    setInterval(function () {
        data = JSON.parse(FooBar.getData());
        createElements(data);
    }, 1000);

}