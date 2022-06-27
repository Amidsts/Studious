//mapped types: creates a new type  from a union type\
type frNames = "freed" | "freak" // union type
type mappedNames = {
    [p in frNames] : p 
}

//mapped types using generics
type genericsMapped<T extends string | number | symbol> = {
    [p in T] : p
}

//create a new type from the above generic type
type newMappedType = genericsMapped<"string" | number >

//mapping using generics and keyof
//remember "keyof" takes an object and produce a string or union type of its objecty
type pick<T, U extends keyof T> = {
    [p in U]: T[U]
}

type pick2 = pick<{s : "send", t : "tend"}, "s" | "t">

//mapping using record, note extend any returns string | number | symbol
type record1<T extends keyof any, U>  = {
    [p in T] : U
}