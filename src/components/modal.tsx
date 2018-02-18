'use strict';

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Classes, IJsonSchema, Schema } from 'timcowebapps-react-utils';
import { ModalProps } from './modal-props';
import { ModalState } from './modal-state';

export default class Modal extends React.Component<ModalProps.IProps, ModalState.IState> {
	public static propTypes: PropTypes.ValidationMap<ModalProps.IProps> = ModalProps.types;
	public static defaultProps: ModalProps.IProps = ModalProps.defaults;

	// region Приватные переменные
	private _shouldClose: boolean = null; /* Следует закрыть? */
	// endregion

	/**
	 * Конструктор класса.
	 * 
	 * @class Modal
	 * @public
	 * @constructor
	 * @param {ModalProps.IProps} props Свойства компонента.
	 */
	public constructor(props?: ModalProps.IProps) {
		super(props);

		this.state = this._getInitialState();

		this._handleOverlayOnClick = this._handleOverlayOnClick.bind(this);
		this._handleContentOnClick = this._handleContentOnClick.bind(this);
	}

	/**
	 * Начальное состояние свойств по умолчанию.
	 * 
	 * @class Modal
	 * @private
	 * @method _getInitialState
	 */
	private _getInitialState(): ModalState.IState {
		return {
			isOpen: this.props.isOpen
		};
	}

	public componentWillReceiveProps(newProps) {
		if (!this.props.isOpen && newProps.isOpen) {
			this._open();
		} else if (this.props.isOpen && !newProps.isOpen) {
			this._close();
		}
	}

	private _open() {
		this.setState({ isOpen: true });
	}

	private _close() {
		this.setState({
			isOpen: false
		});
	}

	private _handleOverlayOnClick(event) {
		if (this._shouldClose === null) {
			this._shouldClose = true;
		}

		if (this._shouldClose) {
			this._requestClose(event);
		}

		this._shouldClose = null;
	}

	private _handleContentOnClick(event) {
		this._shouldClose = false;
	}

	private _requestClose(event) {
		this.setState({
			isOpen: false
		});

		this.props.onRequestClose(event);
	}

	private _shouldBeClosed() {
		return !this.state.isOpen;
	}

	/**
	 * Отрисовывает компонент.
	 * 
	 * @class Modal
	 * @public
	 * @method render
	 */
	public render(): JSX.Element {
		const { schema } = this.props;

		const overlaySchema = Schema.getItemById(schema.items, 'overlay');

		return this._shouldBeClosed() ? null : (
			<div className={schema.properties.classes.pipeline["overlay"]} onClick={this._handleOverlayOnClick}>
				<div className={Classes.bem(schema.properties.classes.pipeline, schema.properties.classes.block, { element: "content" })} onClick={this._handleContentOnClick}>
					{this.props.children}
				</div>
			</div>
		);
	}
};
