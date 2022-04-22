import { TextBlock } from "./types";

export class ParentageUpbringing {
    Name: string;
    Subtitle?: string;
    Description?: TextBlock[] = [];
    Traits: PorUTrait[] =[];
    Page: string;

    // These are set at time of sourcebook inclusion.
    Source?: string;
    Shortform?: string;
    
    constructor(name:string,page:string,subtitle?:string,desc?:string) {
        this.Name = name;
        this.Page = page;
        if (subtitle) {this.Subtitle = subtitle};
        if (desc) {this.Description.push({type:'Paragraph',content:desc})};
        return this;
    }

    desc(d:string) : this {
        this.Description.push({type:'Paragraph',content:d});
        return this;
    }

    multitrait(t:PorUTrait[]) : this {
        t.forEach((T) => {
            this.Traits.push(T);
        })
        return this;
    }

    subtitle(st: string) : this {
        this.Subtitle = st;
        return this;
    }
}

export class PorUTrait {
    Cost: number;
    Name: string;
    Description: string;

    constructor(name:string,desc:string,cost:number) {
        this.Name = name;
        this.Description = desc;
        this.Cost = cost;
        return this;
    }
}