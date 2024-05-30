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
import type { FacturiDTO } from './FacturiDTO';
import {
    FacturiDTOFromJSON,
    FacturiDTOFromJSONTyped,
    FacturiDTOToJSON,
} from './FacturiDTO';

/**
 * 
 * @export
 * @interface FacturiDTOPagedResponse
 */
export interface FacturiDTOPagedResponse {
    /**
     * 
     * @type {number}
     * @memberof FacturiDTOPagedResponse
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof FacturiDTOPagedResponse
     */
    pageSize?: number;
    /**
     * 
     * @type {number}
     * @memberof FacturiDTOPagedResponse
     */
    totalCount?: number;
    /**
     * 
     * @type {Array<FacturiDTO>}
     * @memberof FacturiDTOPagedResponse
     */
    data?: Array<FacturiDTO> | null;
}

/**
 * Check if a given object implements the FacturiDTOPagedResponse interface.
 */
export function instanceOfFacturiDTOPagedResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FacturiDTOPagedResponseFromJSON(json: any): FacturiDTOPagedResponse {
    return FacturiDTOPagedResponseFromJSONTyped(json, false);
}

export function FacturiDTOPagedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): FacturiDTOPagedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'page': !exists(json, 'page') ? undefined : json['page'],
        'pageSize': !exists(json, 'pageSize') ? undefined : json['pageSize'],
        'totalCount': !exists(json, 'totalCount') ? undefined : json['totalCount'],
        'data': !exists(json, 'data') ? undefined : (json['data'] === null ? null : (json['data'] as Array<any>).map(FacturiDTOFromJSON)),
    };
}

export function FacturiDTOPagedResponseToJSON(value?: FacturiDTOPagedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'page': value.page,
        'pageSize': value.pageSize,
        'totalCount': value.totalCount,
        'data': value.data === undefined ? undefined : (value.data === null ? null : (value.data as Array<any>).map(FacturiDTOToJSON)),
    };
}

