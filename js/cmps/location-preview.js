


export class locationPreview {
    constructor(id, info, weather, onDeleteClicked, onUpdateClicked) {
        this.id = id;
        this.info = info;
        this.weather = weather;
        this.onDeleteClicked = onDeleteClicked;
        this.onUpdateClicked = onUpdateClicked;
    }
    render() {

        let elRow = document.createElement('tr');

        let elCellId = document.createElement('td');
        let elCellInfo = document.createElement('td');
        let elCellWeather = document.createElement('td');
        let elCellActions = document.createElement('td');
        let elDeleteBtn = document.createElement('button');
        let elUpdateBtn = document.createElement('button');

        elCellId.innerText = this.id;
        elCellInfo.innerText = this.info;
        elCellWeather.innerText = this.weather;
        elDeleteBtn.innerText = 'Delete';
        elUpdateBtn.innerText = 'Update';

        elDeleteBtn.classList.add('table-btn');
        elUpdateBtn.classList.add('table-btn');
        elDeleteBtn.addEventListener('click', () => {
            this.onDeleteClicked(this.id)
        });
        elUpdateBtn.addEventListener('click', () => {
            this.onUpdateClicked(this.id)
        });

        elCellActions.appendChild(elDeleteBtn);
        elCellActions.appendChild(elUpdateBtn);

        elRow.appendChild(elCellId)
        elRow.appendChild(elCellInfo)
        elRow.appendChild(elCellWeather)
        elRow.appendChild(elCellActions)

        return elRow;
    }
}