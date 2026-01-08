package com.codegym.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "players")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Mã cầu thủ không được để trống")
    @Pattern(regexp = "^PL-\\d{4}$", message = "Mã phải có định dạng PL-XXXX")
    private String playerCode;

    @NotEmpty(message = "Tên không được để trống")
    private String name;

    @NotNull(message = "Ngày sinh không được để trống")
    private String dob;

    @Min(value = 1, message = "Giá trị phải lớn hơn 0")
    private Double transferValue;

    @NotEmpty(message = "Vị trí không được để trống")
    private String position;
}
