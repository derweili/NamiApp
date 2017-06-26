import { NamiMember } from './member.model';
export class NamiGroup{

    constructor(
        public descriptor: string,
        public dissolution_date : any,
        public creditorIdentification: any,
        public level: string,
        public level_id: number,
        public email: string,
        public fax: string,
        public fibuDebitorKonto: string,
        public fibuProfitLonto: string,
        public groupNumber: string,
        public foundingDate: any,
        public id: number,
        public name: string,
        public number: string,
        public parentGroupName: string,
        public parentGroupId: number,
        public selectedRecordsIds: any,
        public residence: any,
        public contact: any,
        public website: any,
        public status: any,
        public status_id: any,
        public phone: any,
        public members: NamiMember[]
    ){}

}