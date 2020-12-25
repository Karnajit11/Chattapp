const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
    accessKeyId: 'AKIAIBXMNQUFX3XR65HA',
    secretAccessKey: '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',   
    region: 'ap-south-1'
});

const s0 = new AWS.S3({});

const upload = multer({
    storage: multerS3({
        s3: s0,
        bucket: 'chatapp-footballkik',
        acl: 'public-read',
        metadata(req, file, cb){
            cb(null, {fieldName: file.fieldname});
        },
        key(req, file, cb){
            cb(null, file.originalname);
        },
        rename(fieldName, fileName){
            return fileName.replace(/\W+/g, '-');
        }
    })
});

exports.Upload = upload;