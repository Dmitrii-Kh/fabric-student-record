import express from 'express';
import {X509WalletMixin} from 'fabric-network';
import {getConnectedWallet, sendTransaction} from '../utils';

const router = express.Router();

const createStudentRecord = async (req, res) => {
    const {certificate, privateKey, studentEmail, studentFullName} = req.body;
    try {
        const mixin = X509WalletMixin.createIdentity('Org1MSP', certificate, privateKey)
        const gateway = await getConnectedWallet('Org1MSP', mixin);
        const result = await sendTransaction(gateway, {
            name: 'createStudentRecord',
            props: [studentEmail, studentFullName]
        })
        gateway.disconnect()
        res.status(201).json({data: result})
    } catch (e) {
        res.status(400).json({message: e.message});
    }
};


const getStudentData = async (req, res) => {
    const {certificate, privateKey, studentEmail} = req.body;
    try {
        const mixin = X509WalletMixin.createIdentity('Org1MSP', certificate, privateKey)
        const gateway = await getConnectedWallet('Org1MSP', mixin);
        const result = await sendTransaction(gateway, {
            name: 'getStudentData',
            props: [studentEmail]
        })
        gateway.disconnect()
        res.status(201).json({data: result})
    } catch (e) {
        res.status(400).json({message: e.message});
    }
};

const addSubjectToStudentRecord = async (req, res) => {
    const {certificate, privateKey, studentEmail, semesterNumber, subjectName} = req.body;
    try {
        const mixin = X509WalletMixin.createIdentity('Org1MSP', certificate, privateKey)
        const gateway = await getConnectedWallet('Org1MSP', mixin);
        const result = await sendTransaction(gateway, {
            name: 'addSubjectToStudentRecord',
            props: [studentEmail, semesterNumber, subjectName]
        })
        gateway.disconnect()
        res.status(201).json({data: result})
    } catch (e) {
        res.status(400).json({message: e.message});
    }
};

const addGradeToStudentRecord = async (req, res) => {
    const {certificate, privateKey, studentEmail, semesterNumber, subjectName, themeName, grade} = req.body;
    try {
        const mixin = X509WalletMixin.createIdentity('Org1MSP', certificate, privateKey)
        const gateway = await getConnectedWallet('Org1MSP', mixin);
        const result = await sendTransaction(gateway, {
            name: 'addGradeToStudentRecord',
            props: [studentEmail, semesterNumber, subjectName, themeName, grade]
        })
        gateway.disconnect()
        res.status(201).json({data: result})
    } catch (e) {
        res.status(400).json({message: e.message});
    }
};


const getStudentGrades = async (req, res) => {
    const {certificate, privateKey, studentEmail} = req.body;
    try {
        const mixin = X509WalletMixin.createIdentity('Org1MSP', certificate, privateKey)
        const gateway = await getConnectedWallet('Org1MSP', mixin);
        const result = await sendTransaction(gateway, {
            name: 'getStudentGrades',
            props: [studentEmail]
        })
        gateway.disconnect()
        res.status(201).json({data: result})
    } catch (e) {
        res.status(400).json({message: e.message});
    }
};


const getStudentGradesBySemester = async (req, res) => {
    const {certificate, privateKey, studentEmail, semesterNumber} = req.body;
    try {
        const mixin = X509WalletMixin.createIdentity('Org1MSP', certificate, privateKey)
        const gateway = await getConnectedWallet('Org1MSP', mixin);
        const result = await sendTransaction(gateway, {
            name: 'getStudentGradesBySemester',
            props: [studentEmail, semesterNumber]
        })
        gateway.disconnect()
        res.status(201).json({data: result})
    } catch (e) {
        res.status(400).json({message: e.message});
    }
};


router.post('/', createStudentRecord);
router.post('/subject', addSubjectToStudentRecord);
router.post('/grade', addGradeToStudentRecord);
router.get('/grades/sem', getStudentGradesBySemester);
router.get('/grades', getStudentGrades);
router.get('/student', getStudentData);

export default router;
