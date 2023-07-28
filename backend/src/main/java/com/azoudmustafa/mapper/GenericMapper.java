package com.azoudmustafa.mapper;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GenericMapper<E,T> {
    E toEntity(T dto);
    T toDTO(E entity);
}
