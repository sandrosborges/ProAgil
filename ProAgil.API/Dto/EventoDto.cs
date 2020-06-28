using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.API.Dto
{
    public class EventoDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "O campo {0} deve ser preenchido.")]
        [StringLength(100, MinimumLength=3, ErrorMessage="O local deverá ter entre 3 e 100 caracteres.")]
        public string Local { get; set; }
       
        public string DataEvento { get; set; }
        [Required(ErrorMessage = "O campo {0} deve ser preenchido.")]
        public string Tema { get; set; }
        [Range(2, 120000, ErrorMessage = "O campo {0} deve estar entre 2 e 120000.")]
        public int QtdPessoas { get; set; }
        public string ImagemUrl { get; set; }
        [Phone]
        public string Telefone { get; set; }
        [EmailAddress(ErrorMessage = "Email não é válido.")]
        public string Email { get; set; }
        public List<LoteDto> Lotes { get; set; }
        public List<RedeSocialDto> RedesSociais { get; set; }
        public List<PalestranteDto> Palestrantes { get; set; }

    }
}