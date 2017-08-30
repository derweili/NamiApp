//import { LoginService } from './login.service';
import { LoginCredentials } from '../models/login-credentials.model';
import { NamiGroup } from './../models/group.model';
import { NamiMember } from './../models/member.model';
import { LoginService } from './login.service';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';


@Injectable()
export class NamiService {

    groups: NamiGroup[] = [];
    loginCredentials: any;

    constructor(
        private http: Http,
        private storage: Storage,
        private loginService: LoginService
    ) {
    }



    getData(){
        return this.storage.get('NamiGroups')
            .then(
                (groups: NamiGroup[]) => {
                    this.groups = groups != null ? groups : [];
                    return this.groups.slice();
                }
            )
            .catch(
                err => {

                }
            )
    }


    fetchData(){



        var headers = new Headers();

        let credentials = this.loginService.oldLoginCredentials;
        
        console.log('fetch data');
        console.log(credentials);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append("Authorization", "Basic " + btoa(credentials.username + ":" + credentials.password)); 


        return this.http.get('http://nami.derweili.de/nami-app-connector/', {headers: headers})
            .map(res => res.json() )
            .map((res) =>{
                let groups : NamiGroup[] = [];

                for(let group of res){


                        let members : NamiMember[] = [];

                        for(let member of group.members){
                            if( member.status == 'Aktiv' ){
                                members.push(
                                    new NamiMember(
                                        member.first_job,
                                        member.generic_field_1,
                                        member.version,
                                        member.phone_3,
                                        member.phone_2,
                                        member.phone_1,
                                        member.descriptor,
                                        member.entry_id,
                                        member.nationality,
                                        member.rover,
                                        member.scout,
                                        member.member_number,
                                        member.reuse_flag,
                                        member.first_subdivision_id,
                                        member.first_name,
                                        member.id,
                                        member.wolf,
                                        member.contribution_types,
                                        member.grade,
                                        member.email,
                                        member.confession,
                                        member.legal_representative_email,
                                        member.fix_contribution,
                                        member.last_updated,
                                        member.young_scout,
                                        member.youndScout,
                                        member.member_type,
                                        member.bank_info,
                                        member.gender,
                                        member.nickname,
                                        member.date_of_birth,
                                        member.nationality_description,
                                        member.last_name,
                                        member.entry_date,
                                        member.leaving_date,
                                        member.generic_field_2,
                                        member.fax
                                    )
                                );
                            }
                        }

                        groups.push(
                            new NamiGroup(
                                group.descriptor,
                                group.dissolution_date ,
                                group.creditorIdentification,
                                group.level,
                                group.level_id,
                                group.email,
                                group.fax,
                                group.fibu_debitor_konto,
                                group.fibu_profit_konto,
                                group.group_number,
                                group.founding_date,
                                group.id,
                                group.name,
                                group.number,
                                group.parent_group_name,
                                group.parent_group_id,
                                group.selected_records_ids,
                                group.residence,
                                group.contact,
                                group.website,
                                group.status,
                                group.status_id,
                                group.phone,
                                members
                            )
                        )

                    }
                console.log(groups);
                return groups;
            })

    }


    loadFromServer(){
        return this.fetchData()
            .forEach((groups : NamiGroup[]) =>{
                console.log(groups);
                this.groups = groups;
                this.storeGroups();
                return this.groups;
            });

    }

    storeGroups(){
        if( 0 < this.groups.length){
            this.storage.set('NamiGroups', this.groups);
        }
        return;
    }

    deleteData(){
        this.storage.clear();
        this.groups = [];
    }

}
