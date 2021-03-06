export enum ClubStatus {
    None = 0,
    Active = 1,
    PendingActivation = 2,
    Blocked = 3,
    Deleted = 4,
    ActiveAndPending = 5
}

export enum MembershipRequestStatus {
    None = 0,
    Pending = 1,
    Accepted = 2,
    Declined = 3
}

export enum MessageStatus {
    None = 0,
    Pending = 1,
    Read = 2,
    Closed = 3,
    All = 4
}

export enum EntityType {
    System = 0,
    User = 1,
    Club = 2
}

export enum Teams {
    None = 0,
    Red = 1,
    Black = 2
}

export enum Roles {
    Sheriff = 1,
    Don = 2,
    Mafia = 3,
    Red = 4
}

export enum BestPlayers {
    None = 0,
    Best1 = 1,
    Best2 = 2,
    Best3 = 3
}

export enum Role {
    None = 0,
    User = 1,
    ClubAdmin = 2,
    GlobalAdmin = 3,
    SilentDon = 4,
    Guest = 5
} 

export enum UserStatus {
    None = 0,
    Active = 1,
    Blocked = 2,
    Deleted = 3
}

export enum WidgetType {
    None = 0,
    MyClubs = 1,
    Other = 2
}

export enum ClubWidgetType {
    None = 0,
    MainStatistics = 1,
    Other = 3
}