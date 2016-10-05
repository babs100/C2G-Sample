

//FS.debug = true ;

//Images = new FS.Collection('images', {stores: [new FS.Store.FileSystem('images', {path: '~/uploads/images'})]}) ;

Images = new FS.Collection('images', {stores: [new FS.Store.FileSystem('images')]}) ;
Images.allow({
        'insert' : function () {
            return true ;
        },
        'update' : function () {
            return true ;
        },
        'remove' : function () {
            return true ;
        },
        'download' : function () {
            return true ;
        }

    }

);




//PDF = new FS.Collection('pdf', {stores: [new FS.Store.FileSystem('pdf'), {path: '~/uploads/pdf'}]}) ;
PDF = new FS.Collection('pdf', {stores: [new FS.Store.FileSystem('pdf')]}) ;
PDF.allow({
        'insert' : function () {
            return true ;
        },
        'update' : function () {
            return true ;
        },
        'remove' : function () {
            return true ;
        },
        'download' : function () {
            return true ;
        }

    }

);

//DOC = new FS.Collection('doc', {stores: [new FS.Store.FileSystem('doc'), {path: '~/uploads/doc'}]}) ;


DOC = new FS.Collection('doc', {stores: [new FS.Store.FileSystem('doc')]}) ;
DOC.allow({
        'insert' : function () {
            return true ;
        },
        'update' : function () {
            return true ;
        },
        'remove' : function () {
            return true ;
        },
        'download' : function () {
            return true ;
        }

    }

);

