<?php

namespace App\Traits;

class ExtendFaker
{
    protected function females_names()
    {
        return collect([
            'Sofía',
            'Camila',
            'Valentina',
            'Isabella',
            'Valeria',
            'Daniela',
            'Mariana',
            'Clementina',
            'Sara',
            'Eleonor',
            'Victoria',
            'Gabriela',
            'Ximena',
            'Andrea',
            'Natalia',
            'Mía',
            'Martina',
            'Lucía',
            'Samantha',
            'María',
            'María Fernanda',
            'Nicole',
            'Alejandra',
            'Paula',
            'Emily',
            'María José',
            'Fernanda',
            'Luciana',
            'Ana Sofía',
            'Melanie',
            'Regina',
            'Catalina',
            'Ashley',
            'Renata',
            'Agustina',
            'Abril',
            'Emma',
            'Emilia',
            'Jazmín',
            'Juanita',
            'Briana',
            'Vanessa',
            'Antonia',
            'Laura',
            'Antonella',
            'Luna',
            'Carla',
            'Allison',
            'Monserrat',
            'Paulin',
            'Isabel',
            'Juliana',
            'Valerie',
            'Florencia',
            'Adriana',
            'Naomí',
            'Amanda',
            'Ariana',
            'Morena',
            'Natalie',
            'Constanza',
            'Lola',
            'Zoe',
            'Carolina',
            'Micaela',
            'Julia',
            'Claudia',
            'Paola',
            'Alexa',
            'Elena',
            'Isidora',
            'Rebeca',
            'Josefina',
            'Abigail',
            'Julieta',
            'Melissa',
            'Michelle',
            'Alba',
            'María Camila',
            'Angela',
            'Delfina',
            'Aitana',
            'Stephanie',
            'Fátima',
            'Manuela',
            'Alexandra',
            'Paloma',
            'Candela',
            'Clara',
            'Laura Sofía',
            'Diana',
            'Ana María',
            'Guadalupe',
            'Bárbara',
            'Bianca',
            'Miranda',
            'Sabrina',
            'Pilar',
            'Ana María',
            'Marta',
            'Ana',
            'Ana Lorena',
            'Sandra',
            'Giselle',
            'Johanna',
            'María Camila'
        ]);
    }

    /**
     * @return \Illuminate\Support\Collection
     *
     */
    public function males_names()
    {
        return collect([
            'Mateo',
            'Santiago',
            'Matías',
            'Benjamín',
            'Sebastián',
            'Lucas',
            'Thiago',
            'Alejandro',
            'Martín',
            'Nicolás',
            'Joaquín',
            'Emiliano',
            'Samuel',
            'Daniel',
            'Diego',
            'Leonardo',
            'Dylan',
            'Felipe',
            'Maximiliano',
            'Gael',
            'Bruno',
            'Liam',
            'Ian',
            'Gabriel',
            'Emmanuel',
            'Agustín',
            'Adrián',
            'David',
            'Pablo',
            'Bautista',
            'Emilio',
            'Hugo',
            'Manuel',
            'Isaac',
            'Dante',
            'Valentino',
            'Francisco',
            'Leo',
            'Lorenzo',
            'Vicente',
            'Noah',
            'Ángel',
            'León',
            'Benicio',
            'Iker',
            'Rodrigo',
            'Alonso',
            'Tomás',
            'Jerónimo',
            'Simón',
            'Pedro',
            'Álvaro',
            'Rafael',
            'Luciano',
            'Ignacio',
            'Enzo',
            'Salvador',
            'Santino',
            'Juan Pablo',
            'Matthew',
            'Alexander',
            'Oliver',
            'Javier',
            'Damián',
            'Facundo',
            'Álex',
            'Fernando',
            'Valentín',
            'Mario',
            'Luca',
            'Miguel',
            'Franco',
            'Antonio',
            'Alan',
            'Máximo',
            'Julián',
            'Carlos',
            'Marco',
            'Jorge',
            'Cristopher',
            'Juan',
            'Izan',
            'Eduardo',
            'Gaspar',
            'Patricio',
            'Bastian',
            'Jacob',
            'Sergio',
            'Tadeo',
            'Marcos',
            'Gonzalo',
            'Milo',
            'Ethan',
            'Iván',
            'Cristóbal',
            'Axel',
            'Mauricio',
            'Luis',
            'José',
            'Eric',
            'Carlos Andrés',
        ]);
    }

    public function lastnames()
    {
        return collect([
            'Rodríguez',
            'Gómez',
            'López',
            'González',
            'García',
            'Martínez',
            'Ramírez',
            'Sánchez',
            'Hernández',
            'Díaz',
            'Pérez',
            'Torres',
            'Rojas',
            'Vargas',
            'Moreno',
            'Gutiérrez',
            'Jiménez',
            'Muñoz',
            'Castro',
            'Ortiz',
            'Álvarez',
            'Ruiz',
            'Suárez',
            'Romero',
            'Herrera',
            'Valencia',
            'Quintero',
            'Restrepo',
            'Giraldo',
            'Morales',
            'Mejía',
            'Arias',
            'Parra',
            'Jaramillo',
            'Cárdenas',
            'Osorio',
            'Castillo',
            'Salazar',
            'Cardona',
            'Flórez',
            'Medina',
            'Rivera',
            'Montoya',
            'Cortes',
            'Correa',
            'Marín',
            'Rincón',
            'Zapata',
            'Escobar',
            'Velásquez',
            'Vivaldi',
            'Morgan',
            'Montaño'
        ]);
    }

    public function generate_name_woman()
    {
        $first_firstname = extendfaker::females_names();
        $second_firstname = extendfaker::females_names();
        return $first_firstname->random() . ' ' . $second_firstname->random();
    }

    public function generate_name_men()
    {
        $first_firstname = extendfaker::males_names();
        $second_firstname = extendfaker::males_names();
        return $first_firstname->random() . ' ' . $second_firstname->random();
    }

    public function generate_lastname()
    {
        $first_surname = extendfaker::lastnames();
        $second_surname = extendfaker::lastnames();
        return $first_surname->random() . ' ' . $second_surname->random();
    }

    public function generate_email_free($name_person)
    {
        $name_person = mb_strtolower($name_person, 'UTF-8');

        $name = extendfaker::delete_accents($name_person);
        $domains = collect(['hotmail.com', 'gmail.com', 'yahoo.es', 'outlook.com', 'outlook.es']);
        $n_p = str_replace(' ', '.', $name);
        $d = $domains->random();
        $n = rand(1, 99);
        return $n_p . $n . '@' . $d;
    }

    public function delete_accents($cadena)
    {
        //Codificamos la cadena en formato utf8 en caso de que nos de errores
        //$cadena = utf8_encode($cadena);

        //Ahora reemplazamos las letras
        $cadena = str_replace(
            array('á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'),
            array('a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A'),
            $cadena
        );

        $cadena = str_replace(
            array('é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'),
            array('e', 'e', 'e', 'e', 'E', 'E', 'E', 'E'),
            $cadena
        );

        $cadena = str_replace(
            array('í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î'),
            array('i', 'i', 'i', 'i', 'I', 'I', 'I', 'I'),
            $cadena
        );

        $cadena = str_replace(
            array('ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'),
            array('o', 'o', 'o', 'o', 'O', 'O', 'O', 'O'),
            $cadena
        );

        $cadena = str_replace(
            array('ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'),
            array('u', 'u', 'u', 'u', 'U', 'U', 'U', 'U'),
            $cadena
        );

        $cadena = str_replace(
            array('ñ', 'Ñ', 'ç', 'Ç'),
            array('n', 'N', 'c', 'C'),
            $cadena
        );

        return $cadena;
    }
}
