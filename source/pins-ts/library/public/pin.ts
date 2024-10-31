public interface IPin {
    string TokenId { get; set; }
    string Title {get; set; }
    string Description  {get; set; }
    string GMNotes  {get; set; }

    void Load();
    void Save();    
}


export interface Pin {
    tokenId: string;
    title: string;
    description: string;
    gMNotes: string;
}