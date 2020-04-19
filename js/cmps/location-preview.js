


export class locationPreview {
    constructor(id, info, weather, onDeleteClicked, onUpdateClicked) {
        this.id = id;
        this.info = info;
        this.weather = weather;
        this.onDeleteClicked = onDeleteClicked;
        this.onUpdateClicked = onUpdateClicked;
    }
    renderList() {
        debugger

        let elRow = document.createElement('tr');
        
        let elCellId = document.createElement('td').innerText = this.id;
        let elCellInfo = document.createElement('td').innerText = this.info;
        let elCellWeather = document.createElement('td').innerText = this.weather;
        let elCellActions = document.createElement('td');
        let elDeleteBtn = document.createElement('button');
        let elUpdateBtn = document.createElement('button');

        elDeleteBtn.classList.add('table-btn');
        elUpdateBtn.classList.add('table-btn');
        elDeleteBtn.addEventListener('click', this.onDeleteClicked);
        elUpdateBtn.addEventListener('click', this.onUpdateClicked);

        elCellActions.appendChild(elDeleteBtn);
        elCellActions.appendChild(elUpdateBtn);

        elRow.appendChild(elCellId)
        elRow.appendChild(elCellInfo)
        elRow.appendChild(elCellWeather)
        elRow.appendChild(elCellWeather)
    }
}