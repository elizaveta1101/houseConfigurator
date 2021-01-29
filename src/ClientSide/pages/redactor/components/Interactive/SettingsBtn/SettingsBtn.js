import React from 'react';
import appState from '../../../js/appState';
import classes from './SettingsBtn.module.css';

class SettingsBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuVisibility: true,
            hatchCellSize: appState.hatchProp.cellSize,
            hatchVisibility: appState.hatchProp.visible
        }
        this.changeMenuVisibility = this.changeMenuVisibility.bind(this);
        this.changeHatchVisibility = this.changeHatchVisibility.bind(this);
        this.changeHatchSize = this.changeHatchSize.bind(this);
    }

    changeMenuVisibility() {
        this.setState({
            menuVisibility: !this.state.menuVisibility
        });
    }

    changeHatchVisibility() {
        let visible = !appState.hatchProp.visible;
        appState.changeState('changeHatchVisibility', visible);
        this.setState({
            hatchVisibility: appState.hatchProp.visible,
        });
        console.log(appState.sceneHatch);
    }

    changeHatchSize(event) {
        let cellsize = Number(event.target.value);
        // if (cellsize > 0.05) {
            appState.changeState('changeHatchCellSize', cellsize);
            this.setState({
                hatchCellSize: appState.hatchProp.cellSize,
            });
        // }
        
    }
    

    render() {
        return (
            <div className={classes.settings}>
                <button
                    className={classes.settingsBtn}
                    onClick={this.changeMenuVisibility}
                > + </button>
                <div
                    className={classes.settingsMenu}
                    hidden={this.state.menuVisibility}
                >
                    <div className="field" key='hatchSetting'>
                        <label className='label'>
                            <input
                                className='settingsCheck'
                                type='checkbox'
                                name='settingsCheck'
                                checked={this.state.hatchVisibility}
                                onChange={this.changeHatchVisibility}
                            />
                            Отобразить сетку?
                        </label>
                    </div>
                    <div className='field' key='cellSetting'>
                        <label className='label'>
                            Размер клетки
                            <input
                                className='settingsSize'
                                type='number'
                                min='0.1'
                                max='5'
                                step='0.1'
                                name='settingsSize'
                                value={this.state.hatchCellSize}
                                onChange={this.changeHatchSize}
                            />
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}

export { SettingsBtn };