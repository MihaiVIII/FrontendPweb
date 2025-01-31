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
/**
 * 
 * @export
 * @interface CartDTO
 */
export interface CartDTO {
    /**
     * 
     * @type {string}
     * @memberof CartDTO
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof CartDTO
     */
    count?: number;
    /**
     * 
     * @type {number}
     * @memberof CartDTO
     */
    price?: number;
    /**
     * 
     * @type {string}
     * @memberof CartDTO
     */
    userId?: string;
}

/**
 * Check if a given object implements the CartDTO interface.
 */
export function instanceOfCartDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CartDTOFromJSON(json: any): CartDTO {
    return CartDTOFromJSONTyped(json, false);
}

export function CartDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): CartDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'count': !exists(json, 'count') ? undefined : json['count'],
        'price': !exists(json, 'price') ? undefined : json['price'],
        'userId': !exists(json, 'userId') ? undefined : json['userId'],
    };
}

export function CartDTOToJSON(value?: CartDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'count': value.count,
        'price': value.price,
        'userId': value.userId,
    };
}

