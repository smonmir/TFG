import { Rol } from "../rol/rol";

export class Usuario {

    private id!: number;
    private nombre!: string;
    private contrasena!: string;
    private email!: string;
    private telefono!: string;
    private rol: Rol;

    constructor(id: number, nombre: string, email:string, contrasena: string, telefono: string, rol: Rol){
        this.id = id;
        this.nombre = nombre;
        this.contrasena = contrasena;
        this.email = email;
        this.telefono = telefono;
        this.rol = rol;
    }


    // Getters
    public getId(): number {
        return this.id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getContrasena(): string {
        return this.contrasena;
    }

    public getEmail(): string {
        return this.email;
    }

    public getTelefono(): string {
        return this.telefono;
    }

    public getRol(): Rol{
        return this.rol;
    }

    // Setters
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public setContrasena(contrasena: string): void {
        this.contrasena = contrasena;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setTelefono(telefono: string): void {
        this.telefono = telefono;
    }
    
    public setRol(rol: Rol): void {
        this.rol = rol;
    }

}
