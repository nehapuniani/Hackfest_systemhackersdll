/*
    *
    * Wijmo Library 5.20151.63
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    * 
    * Licensed under the Wijmo Commercial License. 
    * sales@wijmo.com
    * http://wijmo.com/products/wijmo-5/license/
    *
    */
/**
* Provides classes that support the OData protocol, including the
* @see:ODataCollectionView class.
*
* OData is a standardized protocol for creating and consuming data APIs.
* OData builds on core protocols like HTTP and commonly accepted methodologies like REST.
* The result is a uniform way to expose full-featured data APIs. (http://www.odata.org/)
*/
declare module wijmo.odata {
    /**
    * Extends the @see:CollectionView class to support loading and saving data
    * to and from OData sources.
    *
    * You can use the @see:ODataCollectionView class to load data from OData services
    * and use it as a data source for any Wijmo controls.
    *
    * In addition to full CRUD support you get all the @see:CollectionView features
    * including sorting, filtering, paging, and grouping. The sorting, filtering, and
    * paging functions may be peformed on the server or on the client.
    *
    * The code below shows how you can instantiate an @see:ODataCollectionView that
    * selects some fields from the data source and provides sorting on the client.
    * Notice how the 'options' parameter is used to pass in initialization data,
    * which is the same approach used when initializing controls:
    *
    * <pre>var url = 'http://services.odata.org/Northwind/Northwind.svc';
    * var categories = new wijmo.odata.ODataCollectionView(url, 'Categories', {
    *   fields: ['CategoryID', 'CategoryName', 'Description'],
    *   sortOnServer: false
    * });</pre>
    */
    class ODataCollectionView extends collections.CollectionView {
        public _url: string;
        public _tbl: string;
        public _count: number;
        public _fields: string[];
        public _keys: string[];
        public _dataTypes: any;
        public _sortOnServer: boolean;
        public _pageOnServer: boolean;
        public _filterOnServer: boolean;
        public _inferDataTypes: boolean;
        public _dataTypesInferred: any;
        public _filterDef: string;
        public _toGetData: number;
        public _loading: boolean;
        public _odv: number;
        static _odvCache: {};
        static _rxDate: RegExp;
        /**
        * Initializes a new instance of an @see:ODataCollectionView.
        *
        * @param url Url of the OData service (for example
        * 'http://services.odata.org/Northwind/Northwind.svc').
        * @param tableName Name of the table (entity) to retrieve from the service.
        * If not provided, a list of the tables (entities) available is retrieved.
        * @param options JavaScript object containing initialization data (property
        * values and event handlers) for the @see:ODataCollectionView.
        */
        constructor(url: string, tableName: string, options?: any);
        /**
        * Gets or sets an array containing the names of the fields to retrieve from
        * the data source.
        *
        * If this property is set to null or to an empty array, all fields are
        * retrieved.
        *
        * For example, the code below creates an @see:ODataCollectionView that
        * gets only three fields from the 'Categories' table in the database:
        *
        * <pre>var categories = new wijmo.data.ODataCollectionView(url, 'Categories', {
        *   fields: ['CategoryID', 'CategoryName', 'Description']
        * });</pre>
        */
        public fields : string[];
        /**
        * Gets or sets an array containing the names of the key fields.
        *
        * Key fields are required for update operations (add/remove/delete).
        */
        public keys : string[];
        /**
        * Gets or sets a JavaScript object to be used as a map for coercing data types
        * when loading the data.
        *
        * The object keys represent the field names and the values are @see:DataType values
        * that indicate how the data should be coerced.
        *
        * For example, the code below creates an @see:ODataCollectionView and specifies
        * that 'Freight' values, which are stored as strings in the database, should be
        * converted into numbers; and that three date fields should be converted into dates:
        *
        * <pre>var orders = new wijmo.data.ODataCollectionView(url, 'Orders', {
        *   dataTypes: {
        *     Freight: wijmo.DataType.Number
        *     OrderDate: wijmo.DataType.Date,
        *     RequiredDate: wijmo.DataType.Date,
        *     ShippedDate: wijmo.DataType.Date,
        *   }
        * });</pre>
        *
        * This property is useful when the database contains data stored in
        * formats that do not conform to common usage.
        *
        * In most cases you don't have to provide information about the
        * data types, because the @see:inferDataTypes property handles
        * the conversion of Date values automatically.
        *
        * If you do provide explicit type information, the @see:inferDataTypes
        * property is not applied. Because of this, any data type information
        * that is provided shold be complete, including all fields of type
        * Date.
        */
        public dataTypes : any;
        /**
        * Gets or sets a value that determines whether fields that contain
        * strings that look like standard date representations should be
        * converted to dates automatically.
        *
        * This property is set to true by default, because the @see:ODataCollectionView
        * class uses JSON and that format does not support Date objects.
        *
        * This property has no effect if specific type information is provided using
        * the @see:dataTypes property.
        */
        public inferDataTypes : boolean;
        /**
        * Gets or sets a value that determines whether sort operations
        * should be performed on the server or on the client.
        *
        * Use the @see:sortDescriptions property to specify how the
        * data shold be sorted.
        */
        public sortOnServer : boolean;
        /**
        * Gets or sets a value that determines whether paging should be
        * performed on the server or on the client.
        *
        * Use the @see:pageSize property to enable paging.
        */
        public pageOnServer : boolean;
        /**
        * Gets or sets a value that determines whether filtering should be
        * performed on the server or on the client.
        *
        * Use the @see:filter property to perform filtering on the client,
        * and use the @see:filterDefinition property to perform filtering
        * on the server.
        */
        public filterOnServer : boolean;
        /**
        * Gets or sets a string containing an OData filter specification to
        * be used for filtering the data on the server.
        *
        * The filter definition syntax is described in the
        * <a href="http://www.odata.org/documentation/odata-version-2-0/uri-conventions/">OData documentation</a>.
        *
        * For example, the code below causes the server to return records where the 'CompanyName'
        * field starts with 'A' and ends with 'S':
        *
        * <pre>view.filterDefinition = "startswith(CompanyName, 'A') and endswith(CompanyName, 'B')";</pre>
        *
        * Filter definitions can be generated automatically.
        * For example, the @see:wijmo.grid.filter.FlexGridFilter component detects whether
        * its data source is an #see:ODataCollectionView and automatically udpates both the
        * @see:filter and @see:filterDefiniton properties.
        */
        public filterDefinition : string;
        /**
        * Gets or sets the OData version used by the server.
        *
        * There are currently four versions of OData services, 1.0 through 4.0.
        * Version 4.0 is used by the latest services, but there are many legacy
        * services still in operation.
        *
        * If you know what version of OData your service implements, then set the
        * @see:oDataVersion property to the appropriate value (1 through 4) when you
        * create the @see:ODataCollectionView (see example below).
        *
        * <pre>var url = 'http://services.odata.org/Northwind/Northwind.svc';
        * var categories = new wijmo.odata.ODataCollectionView(url, 'Categories', {
        *   oDataVersion: 1.0, // legacy OData source
        *   fields: ['CategoryID', 'CategoryName', 'Description'],
        *   sortOnServer: false
        * });</pre>
        *
        * If you do not know what version of OData your service implements (perhaps
        * you are writing an OData explorer application), then do not specify the
        * version. In this case, the @see:ODataCollectionView will get this information
        * from the server.This operation requires an extra request, but only once
        * per service URL, so the overhead is small.
        */
        public oDataVersion : number;
        /**
        * Gets a value that indicates the @see:ODataCollectionView is
        * currently loading data.
        *
        * This property can be used to provide progress indicators.
        */
        public isLoading : boolean;
        /**
        * Occurs when the @see:ODataCollectionView starts loading data.
        */
        public loading: Event;
        /**
        * Raises the @see:loading event.
        */
        public onLoading(e?: EventArgs): void;
        /**
        * Occurs when the @see:ODataCollectionView finishes loading data.
        */
        public loaded: Event;
        /**
        * Raises the @see:loaded event.
        */
        public onLoaded(e?: EventArgs): void;
        /**
        * Occurs when there is an error reading or writing data.
        */
        public error: Event;
        /**
        * Raises the @see:error event.
        *
        * By default, errors throw exceptions and trigger a data refresh. If you
        * want to prevent this behavior, set the @see:cancel parameter to true
        * in the event handler.
        *
        * @param e @see:RequestErrorEventArgs that contains information about the error.
        */
        public onError(e: RequestErrorEventArgs): boolean;
        /**
        * Override @see:commitNew to add the new item to the database.
        */
        public commitNew(): void;
        /**
        * Override @see:commitEdit to modify the item in the database.
        */
        public commitEdit(): void;
        /**
        * Override @see:remove to remove the item from the database.
        *
        * @param item Item to be removed from the database.
        */
        public remove(item: any): void;
        /**
        * Gets the total number of items in the view before paging is applied.
        */
        public totalItemCount : number;
        /**
        * Gets the total number of pages.
        */
        public pageCount : number;
        /**
        * Gets or sets the number of items to display on a page.
        */
        public pageSize : number;
        /**
        * Raises the @see:pageChanging event.
        *
        * @param e @see:PageChangingEventArgs that contains the event data.
        */
        public onPageChanging(e: collections.PageChangingEventArgs): boolean;
        public _getPageView(): any[];
        public _performRefresh(): void;
        private _stringifyNumbers(item);
        private _getReadUrl(nextLink?);
        private _getReadParams(nextLink?);
        private _convertItem(dataTypes, item);
        private _getInferredDataTypes(arr);
        private _getData(nextLink?);
        private _getServiceUrl();
        private _getSchema();
        private _getWriteUrl(item?);
        private _error(xhr);
    }
}

