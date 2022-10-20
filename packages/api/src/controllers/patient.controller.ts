import {
  createPatient,
  deletePatient,
  getPatients,
  searchPatients,
  updateDisabled,
  updatePatient,
} from '../services/patient.service';
import {
  messageDelete,
  messageSuccess,
  messageUpdate,
} from '../utils/message.response';

export class patientController {
  static create = async (req: any, res: any, next: any) => {
    try {
      const data = await createPatient(req.body);
      res.status(200).json(messageSuccess(data));
    } catch (error: any) {
      res.status(401).json(error);
      next();
    }
  };
  static update = async (req: any, res: any, next: any) => {
    try {
      const data = await updatePatient(req.body);
      res.status(200).json(messageUpdate(data));
    } catch (error: any) {
      res.status(401).json(error);
      next();
    }
  };
  static disabled = async (req: any, res: any, next: any) => {
    try {
      const data = await updateDisabled(req.body);
      res.status(200).json(messageUpdate(data));
    } catch (error: any) {
      res.status(401).json(error);
      next();
    }
  };
  static deleteItem = async (req: any, res: any, next: any) => {
    try {
      const data = await deletePatient(req.params.id);
      res.status(200).json(messageDelete(data));
    } catch (error: any) {
      res.status(401).json(error);
      next();
    }
  };
  static get = async (req: any, res: any, next: any) => {
    try {
      const data = await getPatients();
      res.status(200).json(data);
    } catch (error: any) {
      res.status(401).json(error);
      next();
    }
  };
  static search = async (req: any, res: any, next: any) => {
    try {
      const data = await searchPatients(req.params.search);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(401).json(error);
      next();
    }
  };
}
