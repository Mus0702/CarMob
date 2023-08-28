package com.azoudmustafa.model;

import com.azoudmustafa.enums.Role;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "`user`")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotEmpty
    @Size(min = 3, max = 50, message = "taille entre 3 et 10")
    @Column(name = "lastname")
    private String lastname;
    @NotEmpty
    @Column(name = "firstname")
    @Size(min = 3, max = 50, message = "{validation.name.size.too_short}")
    private String firstname;
    @Email
    @Column(name = "email")
    private String email;
    @NotEmpty
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$")
    @Column(name = "password")
    private String password;
    @Column(name = "birthdate")
    private LocalDate birthdate;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Min(0)
    @Max(5)
    private Double rating;
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne(fetch = FetchType.EAGER,cascade = CascadeType.REMOVE)
    @JoinColumn(name = "car_id")
    private Car car;
    @Transient
    private boolean isDriver;

    @JsonDeserialize(using = CustomAuthorityDeserializer.class)
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(getRole().name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
