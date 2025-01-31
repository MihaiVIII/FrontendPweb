/* tslint:disable */
/* eslint-disable */
/**
 * MobyLab Web App
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
} from './ErrorMessage';
import type { ItemDTO } from './ItemDTO';
import {
    ItemDTOFromJSON,
    ItemDTOFromJSONTyped,
    ItemDTOToJSON,
} from './ItemDTO';

/**
 * 
 * @export
 * @interface ItemDTORequestResponse
 */
export interface ItemDTORequestResponse {
    /**
     * 
     * @type {ItemDTO}
     * @memberof ItemDTORequestResponse
     */
    response?: ItemDTO;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof ItemDTORequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the ItemDTORequestResponse interface.
 */
export function instanceOfItemDTORequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ItemDTORequestResponseFromJSON(json: any): ItemDTORequestResponse {
    return ItemDTORequestResponseFromJSONTyped(json, false);
}

export function ItemDTORequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ItemDTORequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : ItemDTOFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function ItemDTORequestResponseToJSON(value?: ItemDTORequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': ItemDTOToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}

