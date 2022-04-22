export class ParentageUpbringing {
    Name: string;
    Subtitle?: string;
    Description?: string;
    Traits: PorUTrait[] =[];
    Page: string;

    // These are set at time of sourcebook inclusion.
    Source?: string;
    Shortform?: string;
    
    constructor(name:string,page:string,subtitle?:string,desc?:string) {
        this.Name = name;
        this.Subtitle = subtitle;
        this.Description = desc;
        this.Page = page;
        this.Traits = [];
        return this;
    }

    multitrait(t:PorUTrait[]) : this {
        t.forEach((T) => {
            this.Traits.push(T);
        })
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