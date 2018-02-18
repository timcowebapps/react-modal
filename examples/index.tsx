'use strict';

/* Внешние зависимости */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

/* Внутрение зависимости */
import Modal from '../src/components/modal';

import 'timcowebapps-scss-dir/_reboot.scss';
var styles: any = require('./index.scss');

class App extends React.Component<any, any> {
	/**
	 * Конструктор класса.
	 * 
	 * @class App
	 * @public
	 * @constructor
	 * @param {any} props Свойства компонента.
	 */
	public constructor(props?: any) {
		super(props);

		this.state = {
			isModalOpen: false
		};

		this._openModal = this._openModal.bind(this);
		this._closeModal = this._closeModal.bind(this);
	}

	private _openModal(event) {
		var html_element = document.getElementsByTagName('html')[0];
		html_element.setAttribute('style', 'overflow: hidden');

		this.setState({
			isModalOpen: true
		});
	}

	private _closeModal(event) {
		var html_element = document.getElementsByTagName('html')[0];
		html_element.setAttribute('style', 'overflow: visible');

		this.setState({
			isModalOpen: false
		});
	}

	/**
	 * Отрисовывает компонент.
	 * 
	 * @class App
	 * @public
	 * @method render
	 */
	public render(): JSX.Element {
		return (
			<div>
				<Modal schema={{
					properties: {
						classes: {
							pipeline: styles,
							block: "modal"
						}
					},
					items: [{
						id: "overlay",
						// classes: {
						// 	modifiers: [],
						// 	extra: ""
						// },
					}]
				}} isOpen={this.state.isModalOpen} onRequestClose={this._closeModal}>Hello World</Modal>

				<button type="button" onClick={this._openModal}>Open</button>
			</div>
		);
	}
};

ReactDOM.render(
	<App />,
	document.getElementById('react-view')
);
