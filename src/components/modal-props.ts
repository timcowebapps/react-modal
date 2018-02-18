'use strict';

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IJsonSchema } from 'timcowebapps-react-utils';

export namespace ModalProps {
	export interface IProps extends React.Props<any> {
		/**
		 * Дочерние элементы.
		 *
		 * @type {React.ReactNode}
		 * @memberof ModalProps.IProps
		 */
		children?: React.ReactNode;

		/**
		 * Схема.
		 * 
		 * @type {IJsonSchema}
		 * @memberof FieldProps.IProps
		 */
		schema: IJsonSchema;

		isOpen: boolean;
		
		onRequestClose: Function;
	}

	export const types: PropTypes.ValidationMap<IProps> = {
		isOpen: PropTypes.bool,
		onRequestClose: PropTypes.func
	};

	export const defaults: IProps = {
		schema: {
			properties: {
				classes: {
					pipeline: undefined,
					block: "modal"
				}
			}
		},
		isOpen: false,
		onRequestClose: undefined
	};
}
